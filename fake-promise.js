class FakePromise {
    static PENDING = "PENDING" 
    static FULFILLED = "FULFILLED" 
    static REJECTED = "REJECTED"

    constructor(fun){
        this.status = FakePromise.PENDING
        this.result = null
        this.resloveCallbacks = []
        this.rejectCallbacks = []
        try {
            fun(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(result) {
        setTimeout(() => {
            if (this.status === FakePromise.PENDING) {
                this.status = FakePromise.FULFILLED
                this.result = result
                this.resloveCallbacks.forEach((callback) => {
                    callback(result)
                })
            }
        })
    }

    reject(result) {
        setTimeout(() => {
            if (this.status === FakePromise.PENDING) {
                this.status = FakePromise.REJECTED
                this.result = result
                this.rejectCallbacks.forEach((callback) => {
                    callback(result)
                })
            }
        })
    }

    then(onFULFILLED, onREJECTED) {
        onFULFILLED = typeof onFULFILLED === "function" ? onFULFILLED : () => {}
        onREJECTED = typeof onREJECTED === "function" ? onREJECTED : () => {}
        if (this.status === FakePromise.PENDING) {
            this.resloveCallbacks.push(onFULFILLED)
            this.rejectCallbacks.push(onREJECTED)
        }
        if (this.status === FakePromise.FULFILLED) {
            setTimeout(() => {
                onFULFILLED(this.result)
            })
        }
        if (this.status === FakePromise.REJECTED) {
            setTimeout(() => {
                onREJECTED(this.result)
            })
        }
    }
}


console.log("1")
let newPromise = new FakePromise((resolve, reject) => {
    console.log("2")
    setTimeout(() => {
        resolve("useless info resolved")
        console.log("4")
    })
    // throw new Error("this is a throwed error")
})

newPromise.then(
    result => {console.log(result)},
    result => {console.log(result.message)}
)
console.log("3")




// let newPromise = new Promise((resolve, reject) => {
//     resolve("useless info resolved")
// })

// newPromise.then((result) => {
//     console.log(result)
// })