import React, { useEffect, useState } from 'react'
import Layout from '../../template/Layout'
import { Container, Divider } from '@mui/material'
import { Typography, useMediaQuery, useTheme } from '@material-ui/core'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import FilledInput from '@mui/material/FilledInput'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Send from '@mui/icons-material/Send'
import { LoadingButton } from '@mui/lab'
import io from 'socket.io-client'
import axios from 'axios'
import WhatsApp from '@mui/icons-material/WhatsApp'
import { apiRequest, setAuthToken } from '../../utils/api.js'
// import Widget from '../../public/ChatWidget'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

const styleSet = {
    leftCardChat: {
        padding: '10px',
        marginBottom: '10px',
        width: '100%',
        display: 'flex',
        justifyContent: 'start',
    },
    rightCardChat: { padding: '10px', width: '100%', display: 'flex', justifyContent: 'end' },
}

export default function Index() {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Layout>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>{/* <Widget /> */}</div>
        </Layout>
    )
}
