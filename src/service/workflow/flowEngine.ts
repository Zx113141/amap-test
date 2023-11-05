
class FlowEngine {

    runTask(task, ...args) {
        return new Promise((resolve, reject) => {
            this.#_runTask(task, resolve, args)
        })
    }


    #_runTask(task, callback, ...args) {
        const start = Date.now()
        requestAnimationFrame(() => {
            if (Date.now() - start > 16) {
                task(args)
                callback()
            } else {
                this.#_runTask(task, callback, ...args)
            }
        })
    }

}

export default FlowEngine