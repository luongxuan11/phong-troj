import axiosConfig from "../axiosConfig"

export const apiRegister = (payload) => new Promise( async(resolve, reject) => { // có 1 time số (payload) và sẽ nhận đối số là name password và phone
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/register',
            data: payload
        })
        console.log(">> check authService at row 10..",response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})