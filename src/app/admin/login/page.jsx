import React from 'react'
import { AdminLoginForm } from './components/login';
import Footer from '@/components/Footer';

function Login() {
  return (
    <>
    <AdminLoginForm />
    <Footer variant='default' />
    </>
  )
}

export default Login;