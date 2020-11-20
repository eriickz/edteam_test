import { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import * as Ctrl from '../controller';

function CourseForm() {
    const [course, setCourse] = useState({});
    const [isUpdateForm, setIsUpdateForm] = useState(false);
    const [isSucceded, setIsSucceded] = useState(false);

    //URL Param
    const { courseId } = useParams();

    useEffect(() => {
        if ( courseId === undefined ) {
            setCourse({
                title: '',
                poster: '',
                description: '',
                price: '',
                status: false,
            });
        } else {
            Ctrl.getCourseById(courseId).then(res => {
                if ( res.status === 200 ) {
                    setCourse(res.data);
                    setIsUpdateForm(true);
                }
            })
        }
    }, [courseId]);

    const setData = (event, type = '') => {
        event.persist();

        const data = Object.assign({}, course),
            dataType = type || event.target.id,
            value = (type !== 'status') ? event.target.value : event.target.checked;

        data[dataType] = value;

        setCourse(data);
    }

    const createCourse = event => {
        event.preventDefault();
        
        Ctrl.createCourse(course).then(res => {
            if ( res.status === 201 ) {
                setIsSucceded(true);
            }
        })
    }
    
    const updateCourse = event => {
        event.preventDefault();

        Ctrl.updateCourse(courseId, course).then(res => {
            if ( res.status === 200 ) {
                setIsSucceded(true)
            }
        })
    }

    const deleteCourse = () => {
        Swal.fire({
        title: 'Eliminar Curso',
        text: '¿Estas seguro que deseas eliminar este curso?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Eliminar Curso',
        }).then(result => {
            if ( result.isConfirmed ) {
                Ctrl.deleteCourse(courseId).then(res => {
                if ( res.status === 200 ) {
                    Swal.fire('Eliminado', 'El curso ha sido eliminado con éxito.', 'success');

                    setIsSucceded(true);
                }
                })
            }
        })
    }

    return(
        <div className="container">
            {isSucceded && (
                <Redirect to="/cursos" />
            )}
            <Form onSubmit={e => (isUpdateForm) ? updateCourse(e) : createCourse(e)}>
                <h1 className="text-center mt-5 mb-3">{(isUpdateForm) ? 'Editar Curso' : 'Nuevo Curso'}</h1>
                <Form.Group controlId="title">
                    <Form.Label>Nombre del Curso</Form.Label>
                    <Form.Control type="text" placeholder="Escriba un nombre" defaultValue={course.title} onChange={setData} required />
                </Form.Group>
                <Form.Group controlId="poster">
                    <Form.Label>Póster (URL)</Form.Label>
                    <Form.Control type="text" placeholder="Escriba el póster" defaultValue={course.poster} onChange={setData} required />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" placeholder="Escriba un nombre" defaultValue={course.description} onChange={setData} required />
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" min="0" placeholder="0" step=".01" defaultValue={course.price} onChange={setData} required />
                </Form.Group>

                <Form.Check label="¿El curso esta disponible?" checked={course.status} onChange={e => setData(e, 'status')}></Form.Check>

                <Button variant="primary" type="submit" className="mt-3">Guardar Datos</Button>

                {isUpdateForm && (
                    <Button variant="danger" className="mt-3 ml-2" onClick={deleteCourse} >Eliminar Curso</Button>
                )}
            </Form>
        </div>   
    )
}

export default CourseForm;