import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AuthApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/auth',
		headers: {
			"Authorization": `Refresh ${localStorage.getItem("token") || ""}`
		}
	}),
	endpoints: builder => ({
		loginUser: builder.mutation<any, { email: string, password: string }>({ // <тип для респонса, тип для body>
			query: (data) => {
				return {
					method: "POST",
					url: "login",
					body: data,
					credentials: "include"
				}
			},
			transformResponse: (response) => {
				localStorage.setItem('token', response.accessToken)
				return response
			}
		}),
		registerUser: builder.mutation<any, {email: string; password: string}>({
			query: (data) => {
				return {
					method: "POST",
					url: "register",
					body: data,
					credentials: "include"
				}
			}
		}),
		refreshToken: builder.mutation<any, { username: string; sub: { id: string }}>({
			query: (user) => {
				return {
					method: "POST",
					url: "refresh",
					body: user,
					credentials: 'include'
				}
			},
			transformResponse: (response) => {
				localStorage.setItem('token', response.accessToken)
				return response
			}
		})
	})
})

export const { useLoginUserMutation, useRegisterUserMutation, useRefreshTokenMutation } = AuthApi