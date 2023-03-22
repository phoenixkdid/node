import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { isEmpty } from '../../utils/helpers.js'
import axios from 'axios'
import LoadingButton from '@mui/lab/LoadingButton'
import IconKey from '@mui/icons-material/Key'
import { useRouter } from 'next/router'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
})

export default function SignIn() {
    const [error, setError] = useState({})
    const [errorKey, setErrorKey] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handle_sigin = async (data) => {
        setLoading(true)
        const url = `${process.env.NEXT_PUBLIC_API_URL}login`
        const run = await axios
            .post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .catch((error) => {
                setLoading(false)
                if (error?.response?.status == 400) {
                    setErrorKey(error?.response?.data?.msg?.path[0])
                    setError(error?.response?.data?.msg)
                }
                if (error?.response?.status == 403) {
                    setErrorKey(error?.response?.data?.keys)
                    setError(error?.response?.data?.msg)
                }
            })
        if (run) {
            setErrorKey(null)
            setError(null)
            localStorage?.setItem('userToken', JSON.stringify(run?.data))
            router.push('/')
        }
        setLoading(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const login = {
            email: data.get('email'),
            password: data.get('password'),
        }
        handle_sigin(login)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#fff' }}>
                        <img src={`${process.env.NEXT_PUBLIC_BASE_URL}img/logo/logo1.png`} width="35px" />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={errorKey == 'email'}
                            helperText={error?.message ?? ''}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={errorKey == 'password'}
                            helperText={error?.message ?? ''}
                        />
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

                        <LoadingButton
                            type="submit"
                            fullWidth
                            loading={loading}
                            loadingPosition="end"
                            endIcon={<IconKey />}
                            sx={{ mt: 3, mb: 2 }}
                            variant="outlined"
                        >
                            Sign In
                        </LoadingButton>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}
