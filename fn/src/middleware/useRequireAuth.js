import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { apiRequest, setAuthToken } from '../utils/api.js'
const useRequireAuth = () => {
    const router = useRouter()

    useEffect(() => {
        const userToken = localStorage.getItem('userToken')
        if (!userToken) {
            router.push('/auth/signin')
        } else {
            const token = JSON.parse(localStorage.getItem('userToken'))
            setAuthToken(token?.token)
            apiRequest
                .get(`${process.env.NEXT_PUBLIC_API_URL}getMe`)
                .then((response) => {
                    router.push('/home')
                })
                .catch((error) => {
                    router.push('/auth/signin')
                })
        }
    }, [])
    return <strong>loading..</strong>
}

export default useRequireAuth
