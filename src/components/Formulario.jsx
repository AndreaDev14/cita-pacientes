
import {useState, useEffect} from 'react'
import Error from './Error';


const Formulario = ({pacientes, setPacientes,paciente,setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false);

  //Se ejecuta cuando paciente cambia
useEffect(() => {
 if(Object.keys(paciente).length > 0) {
  setNombre(paciente.nombre)
  setPropietario(paciente.propietario)
  setEmail(paciente.email)
  setFecha(paciente.fecha)
  setSintomas(paciente.sintomas)
 }
}, [paciente])


  

  const generarID = () => {
    const fecha = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);

    return fecha + random;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if([nombre,propietario,email,fecha,sintomas].includes('')) {
      //muestra mensaje de error
      setError(true);
      return;
    } 
    //regresa a su estado original
    setError(false);

    //Creación de objeto
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas, 
      id : generarID(),
    }
 

    //Condicion cuando hay un registro o no 
    if(paciente.id) {
      //Editando el registro
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )

            setPacientes(pacientesActualizados)

            setPaciente({})
          

    } else {
   //Pasando pacientes en el prop en App.jsx
   //Nuevo registro
   objetoPaciente.id = generarID();
   setPacientes([...pacientes, objetoPaciente]);
    }
      
    //Reiniciar Formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    
  }

  return (
    <div className=" md:1/2 lg:w-2/5">
        <h2 className=" font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className=" text-lg mt-5 text-center mb-5">
          Añade pacientes y {''}
        <span className=" text-green-600 font-bold">Administralos</span>
        </p>
        <form onSubmit={handleSubmit} className=" bg-white shadow-md rounded-lg py-10 px-5 mb-10">

          {error && <Error> <p>Todos los campos son obligatorios</p></Error>
          
          }
          <div className=" mb-5">
            <label htmlFor="mascota" className=" block text-gray-700 uppercase font-bold">Nombre Mascota</label>
            <input id="mascota" type="text" placeholder="Nombre de la Mascota" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400  rounded-md"
            value={nombre} 
          onChange={ (e => setNombre(e.target.value))}
            
            />
          
          </div>

          <div className=" mb-5">
            <label htmlFor="propietario" className=" block text-gray-700 uppercase font-bold">Nombre Propietario</label>
            <input id="propietario" type="text" placeholder="Nombre de Propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400  rounded-md" 
              value={propietario} 
              onChange={ (e => setPropietario(e.target.value))}
            />
          
          </div>

          <div className=" mb-5">
            <label htmlFor="email" className=" block text-gray-700 uppercase font-bold">Email</label>
            <input id="email" type="email" placeholder="Email de Propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400  rounded-md"
                value={email} 
                onChange={ (e => setEmail(e.target.value))}
            />
          
          </div>
          <div className=" mb-5">
            <label htmlFor="alta" className=" block text-gray-700 uppercase font-bold">Fecha de Alta</label>
            <input id="date" type="date" placeholder="Nombre de la Mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400  rounded-md"
                value={fecha} 
                onChange={ (e => setFecha(e.target.value))}
            />
          
          </div>
          <div className=" mb-5">
            <label htmlFor="sintomas" className=" block text-gray-700 uppercase font-bold">Síntomas</label>
              <textarea name="sintomas" id="sintomas"  className=" border-2 w-full p-2 mt-2 placeholder-gray-400" placeholder="Describe los sintomas"
                value={sintomas} 
                onChange={ (e => setSintomas(e.target.value))}
              />         
          </div>

          <input type="submit" className=" bg-green-600 w-full p-3 text-white uppercase rounded-lg  font-bold hover:bg-green-800 cursor-pointer transition-all" 
          
          value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' } />

        </form>
       
    </div>
  )
}

export default Formulario