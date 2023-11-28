'use server'
 export const GetAdmin = async () => {
    console.log('admin',process.env.isAdmin)
    return process.env.isAdmin ? process.env.isAdmin : false
}

