import {Link} from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className='w-full min-h-screen bg-blue-700 flex flex-col justify-center items-center p-4'>
            <h1 className='font-sans text-white text-center block mt-10 text-3xl md:text-5xl'>404 Not Found</h1>
            <Link to='/' className='mt-10 mb-7 p-4 md:p-7 rounded-lg bg-red-500 text-white text-center block hover:bg-red-700'>
                Regresar al inicio
            </Link>
        </div>
    );
}