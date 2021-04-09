export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("credentials"))

    if (user && user.token) {
        return {
            Authorization: "Bearer " + user.token
        }
    } else {
        return {}
    }
}