import axios from '../api'

class GroupService {
    getGroupsName() {
        return axios.get("/groups/names").then((response) => {
            return response.data
        })
    }
}


export default new GroupService()