import React, { useEffect } from 'react'

import useRequireAuth from '../middleware/useRequireAuth.js'

export default function Index() {
    useRequireAuth()
    return <>loading</>
}
