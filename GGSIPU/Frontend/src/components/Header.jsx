import Logo from '/LogoEG.png'
import '../assets/header.css'

export default function Header(){
    return (
        <>
            <div id='header'>
                <div id='logo'>
                    <img src={Logo}/>
                </div>
                <div id='logout'><b>Logout</b></div>
            </div>
        </>
    )
}