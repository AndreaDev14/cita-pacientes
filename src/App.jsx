import {useState,useEffect} from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import PatientsList from "./components/PatientsList";

function App() {
  const [pacientes,setPacientes] = useState(() => JSON.parse(localStorage.getItem('pacientes')) || []);
  const [paciente,setPaciente] = useState({});

  useEffect(()=>{
       localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

//Eliminar paciente
const eliminarPaciente = (id) => {
  const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id);
  setPacientes(pacientesActualizados)
}


  return (
    <div className="container mx-auto mt-20">
      <Header

      />
      <div className=" ml-2 mt-12 md:flex">
        <Formulario 
        pacientes={pacientes}
        setPacientes={setPacientes}
        paciente={paciente}
        setPaciente={setPaciente}
        />
        <PatientsList 
            pacientes={pacientes}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  );
}

export default App;
