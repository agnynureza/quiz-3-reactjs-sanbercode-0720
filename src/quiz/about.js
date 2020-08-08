import React from 'react'

const About = (props) => {
    return(
	<>
		<div style={{padding: "75px", border: "1px solid #ccc", marginTop:"100px", width:"50%", marginLeft:"auto", marginRight:"auto"}}>
			<h1 style={{textAlign:"center"}}>Data Peserta Sanbercode Bootcamp Reactjs</h1>
			<ol>
				<li><strong style={{width:"100px"}}>Nama:</strong> Agny Muchamad Nureza</li>
				<li><strong style={{width:"100px"}}>Email:</strong> rezaagny@gmail.com</li>
				<li><strong style={{width:"100px"}}>Sistem Operasi yang digunakan:</strong> Linux </li>
				<li><strong style={{width:"100px"}}>Akun Github:</strong> https://github.com/agnynureza</li>
				<li><strong style={{width:"100px"}}>Akun Telegram:</strong> @agnynureza</li>
			</ol>
		</div>
        </>
    )
}

export default About;


