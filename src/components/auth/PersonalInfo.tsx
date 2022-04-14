import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import './PersonalInfo.css';

const PersonalInfo = (props: any): JSX.Element => {
    const {auth: {user: {nombre, apellido, telefono, previousPassword}}, setAuth, actualizarInfo} = useAuth();

    const [personalInfo, setPersonalInfo] = useState({
        nombre,
        apellido,
        telefono: telefono ?? '',
        previousPassword: ''
    });

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();

        if (Object.values(personalInfo).some(value => !value)) {
            props.setAlerta({
                type: 'error',
                messageList: ['Campos Vacíos']
            });

            setTimeout(() => {
                props.setAlerta({
                    type: '',
                    messageList: []
                })
            }, 1500);
            return;
        }

        try {
            const {data: {msg}} = await actualizarInfo(personalInfo);

            props.setAlerta({
                type: 'info',
                messageList: [msg]
            });

            props.setMostrarModal(false);
        } catch (error: any) {
            const {response: {data: {msg}}} = error;

            props.setAlerta({
                type: 'error',
                messageList: [msg]
            });
        } finally {
            setTimeout(() => {
                props.setAlerta({
                    type: '',
                    messageList: []
                })
            }, 1500);
        }
    }

    return (
        <div className="modal-bg flex items-center">
            <button onClick={() => {props.setMostrarModal(false)}} type="button" className='absolute font-bold text-white right-10 top-5 text-2xl hover:cursor-pointer'>
                x
            </button>

            <form onSubmit={handleSubmit} className='bg-white p-4 mx-auto w-3/4 md:w-2/5 rounded-xl'>
                <div>
                <label className="uppercase text-gray-600 block text-xl font-bold">
                    Nombre
                </label>
                <input 
                    className="inputs border w-full p-3 mt-3 bg-gray-200" 
                    type="text" 
                    placeholder="Tu Nombre"
                    value={personalInfo.nombre}
                    onChange={ev => {setPersonalInfo({...personalInfo, nombre: ev.target.value})}}
                />
                <div className="inputs-border-bottom"></div>
                </div>
                <div>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>
                        Apellido
                    </label>
                    <input 
                        className='inputs border w-full p-3 mt-3 bg-gray-200'
                        type="text" 
                        placeholder='Tu Apellido'
                        value={personalInfo.apellido}
                        onChange={ev => {setPersonalInfo({...personalInfo, apellido: ev.target.value})}}
                    />
                    <div className="inputs-border-bottom"></div>
                </div>
                <div>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>
                        Teléfono
                    </label>
                    <input 
                        className='inputs border w-full p-3 mt-3 bg-gray-200'
                        type="tel" 
                        placeholder='No. de Teléfono'
                        value={personalInfo.telefono}
                        onChange={ev => {setPersonalInfo({...personalInfo, telefono: ev.target.value})}}
                    />
                    <div className="inputs-border-bottom"></div>
                </div>
                <div>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>
                        Confirmar Contraseña
                    </label>
                    <input 
                        className='inputs border w-full p-3 mt-3 bg-gray-200'
                        type="password" 
                        placeholder='Contraseña'
                        value={previousPassword}
                        onChange={ev => {setPersonalInfo({...personalInfo, previousPassword: ev.target.value})}}
                    />
                    <div className="inputs-border-bottom"></div>
                </div>

                <input className="button mt-5  
                    px-6 py-4 w-full rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase" 
                type="submit" value="Actualizar Información"/>
            </form>
        </div>
    );
}

export default PersonalInfo;