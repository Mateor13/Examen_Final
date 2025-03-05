import students from '../../assets/students.png';

const InicioEstudiantes = () => {
    return (
        <div className='w-full min-h-screen bg-blue-700 flex flex-col justify-center items-center p-4'>
            <img src={students} alt='students' className='w-16 h-16 md:w-24 md:h-24 mx-auto' />
            <h1 className='font-sans text-white text-center block mt-10 text-3xl md:text-5xl'>Gestión de los estudiantes</h1>
        </div>
    );
};

export default InicioEstudiantes;