import {useState, useEffect}from 'react'
import './App.css';

function App() {
const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [check,setCheck]=useState(false)
const [error,setError]=useState({
  name:false,
  email:false,
  password:false,
  check:false,
  allCheck:false,
})
const messages ={
  name:'Imię powinno zawierać conajmniej 4 znaki i nie może zawierać spacji',
  email:'To nie jest poprawny email. Musi zawierać znak @',
  password:'Hasło nie może być krótsze niż 8 znaków i nie może zawierać spacji',
  check:'Wymagane jest zaakceptowanie regulaminu przez rejestracją',
}

const handleSubmit=(e)=>{
  e.preventDefault()
  if(!check){ setError(prev =>({ ...prev, check:true }))}else{setError(prev =>({ ...prev, check:false }))}
  if(name.length <= 4){setError(prev =>({ ...prev, name:true }))}else{setError(prev =>({ ...prev, name:false }))}
  if(password.length >= 8 && password.indexOf(' ') === -1){setError(prev =>({ ...prev, password:false }))}else{setError(prev =>({ ...prev, password:true }))}
  if( email.indexOf('@') === -1){setError(prev =>({ ...prev, email:true }))}else{setError(prev =>({ ...prev, email:false }))}
  if(!error.name && !error.password && !error.check && !error.email ){
    setError(prev =>({ ...prev, allCheck:true }))
    setName('')
    setPassword('')
    setEmail('')
    setCheck(false)

  }else{ setError(prev =>({ ...prev, allCheck:false }))}
}

useEffect(()=>{setTimeout(()=>{
  setError(prev =>({ ...prev, allCheck:false }))
},3000)})
  return (
    <div className="App">
      <div className="wrapper">
        <div className='background'>
      <form onSubmit={handleSubmit} noValidate>
      <div className='input-form'>
          
            <input type="text" id='name' className='input' value={name} placeholder='Imię:' onChange={e=>setName(e.target.value)} />
            <label  className='float-label' htmlFor="name">Imię:   </label>
         {error.name ? <span className="span-input">{messages.name}</span>:''}
      </div>
      <div className='input-form'>
      
            <input type="email" id='email' className='input' value={email} placeholder='Email:' onChange={e=>setEmail(e.target.value)}/>
            <label className='float-label' htmlFor="email">E-mail:  </label>
          {error.email ? <span className="span-input">{messages.email}</span>:''}
      </div>
      <div className='input-form'>
    
            <input type="password" id='password' className='input' value={password} placeholder='Hasło:' onChange={e=>setPassword(e.target.value)}/>
            <label className='float-label' htmlFor="password">Hasło:  </label>
          {error.password ? <span className="span-input">{messages.password}</span>:''}
      </div>
      <div className='input-form'>
              <input type="checkbox" id='status' className='input-check' checked={check} onChange={()=>setCheck(!check)}/>
              <label className='check-label' htmlFor="status">    Zapoznałem się z regulaminem </label>  
          {error.check ? <span className="span-check">{messages.check}</span>:''}
      </div>
      <div className="btn-wrapper">
      <button>Zapisz się </button>
      </div>
     
      </form>
     {error.allCheck && <h4>Formularz rejestracyjny został wysłany</h4>}
     </div>
     </div>
    </div>
  );
}

export default App;
