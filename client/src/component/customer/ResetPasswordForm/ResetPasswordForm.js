import {
	Box,
	Button,
	Hidden,
	InputAdornment,
	TextField,
	Typography,
} from '@material-ui/core'
import React,{useState} from 'react'
import { BiLockAlt } from 'react-icons/bi'
import bgForgotPasword from '../../../assets/images/forgot-password.png'
import { useStyles } from './styles'
import { Link ,useHistory,useParams} from 'react-router-dom'
import { resetPassword } from '../../../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import bgWave from '../../../assets/images/login-2.png'
import { BiMailSend } from 'react-icons/bi'
const schema = yup.object().shape({

	password: yup.string(),

})

const ResetPasswordForm = () => {
	
	let { id,token } = useParams();
	console.log('A"sas',id,token );
	const dispatch = useDispatch()
	const classes = useStyles()
	const history = useHistory()
	const [error, setError] = useState()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})
	const handleRegister = (data) => {
		console.log("data",data);
		
		data.token=token;
		data.id=id;
		const action = resetPassword(data)
		dispatch(action)
			.then(unwrapResult)
			.then(() => {
				history.push('/login')
			})
			.catch((error) => {
				if (error.status === 400) setError('Email has already been taken')
			})
	}

	return (
		<Box className={classes.login}>
			<Hidden mdDown implementation="js">
				<img src={bgWave} alt="login" className={classes.img1} />
			</Hidden>
			<Box className={classes.container}>
				<Hidden mdDown implementation="js">
					<Box className={classes.imgContainer}>
						<img
							src={bgForgotPasword}
							alt="not-found"
							className={classes.img}
						/>
					</Box>
				</Hidden>
				<form className={classes.form}  onSubmit={handleSubmit(handleRegister)}>
					<Typography component="h2" className={classes.heading}>
						Forgot password?
					</Typography>
					<Typography component="h2" className={classes.subHeading}>
						Enter the email address associated with your account
					</Typography>
					<TextField
						className={classes.input}
						placeholder="password"
						type="password"
						{...register('password')}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<BiMailSend className={classes.inputIcon} />
								</InputAdornment>
							),
							classes: {
								input: classes.input,
							},
						}}
					/>

					<Button type="submit" className={classes.action}>Submit</Button>
					<Link to="/login" className={classes.redirect}>
						Back to login
					</Link>
				</form>
			</Box>
		</Box>
	
	)
}

export default ResetPasswordForm
