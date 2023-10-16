
export const mergeOptions = (options) => {
    let obj = {}
    Object.keys(options).forEach((key: string) => {
        obj = { ...options[key] }
    })
    return obj
}