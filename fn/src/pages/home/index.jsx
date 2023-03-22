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

import { apiRequest, setAuthToken } from '../../utils/api.js'
import Tb from './tables'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

// const userToken = JSON.parse(localStorage.getItem('userToken'))

export default function Index() {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const [loadingNewSession, setloadingNewSession] = useState(false)
    const [newSession, setNewSession] = useState(null)
    const [getQr, setQr] = useState(null)
    const [messages, setMessages] = useState([])
    const [loads, setLoads] = useState(false)
    const [connectDevice, setConnectDevice] = useState(``)
    const handelNewSession = () => {
        setloadingNewSession(true)
        const push = {
            id: newSession,
            isLegacy: true,
        }
        qr(push)
    }
    const qr = async (data) => {
        setLoads(true)
        const token = JSON.parse(localStorage.getItem('userToken')) // token bisa didapat dari localStorage atau tempat penyimpanan yang sesuai
        setAuthToken(token?.token) // set header Authorization Bearer menggunakan token yang disimpan

        apiRequest
            .post(`${process.env.NEXT_PUBLIC_API_URL}new-session`, data)
            .then((response) => {
                console.log(response)
                setLoads(false)
                setQr(response?.data?.data?.qr)
                setMessages([...messages, response?.data?.message])
            })
            .catch((error) => {
                setLoads(false)
                console.log(error)
            })
    }
    useEffect(() => {
        SoketIo()
    }, [])
    const SoketIo = async () => {
        const X = localStorage?.getItem('userToken')
        const ObjX = JSON.parse(X)
        const socket = io(`http://localhost:5000`, {
            auth: { token: ObjX?.token },
        })
        console.log(socket)
        socket.on('connection', (res) => {
            console.log(res)
        })
        socket.on('qr', (res) => {
            setQr(res)
        })
        socket.on('msg', (res) => {
            console.log('msg:', res)
            setMessages([...messages, res])
        })

        socket.on('connnet_success', (res) => {
            // console.log('con', res)
            setConnectDevice(res)
        })
    }
    return (
        <Layout>
            <Typography variant={isSmallScreen ? 'h4' : 'h3'} component="h2">
                Dashboard
            </Typography>
            <Divider />
            <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item md={4} sm={5} xs={12}>
                        <Item style={{ padding: '10px' }}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Buat Koneksi Baru</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={'text'}
                                    onChange={(ev) => {
                                        setNewSession(ev?.target?.value)
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <LoadingButton
                                                onClick={handelNewSession}
                                                loading={loads}
                                                loadingPosition="end"
                                                endIcon={<Send />}
                                            ></LoadingButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormHelperText id="component-error-text">buat nama koneksi baru</FormHelperText>
                        </Item>
                        {getQr && (
                            <>
                                <hr />
                                <Item>
                                    <img src={getQr} width="100%" alt="" />
                                </Item>
                            </>
                        )}
                        {messages?.map((res, i) => (
                            <Item key={i} style={{ marginBottom: '5px' }}>
                                {res}
                            </Item>
                        ))}

                        {/* {connectDevice != '' && (
                            <>
                                <hr />
                                <Item>{connectDevice}</Item>
                            </>
                        )} */}
                    </Grid>
                    <Grid item md={8} sm={7} xs={12}>
                        <Item>
                            <Tb update={messages} />
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )
}
