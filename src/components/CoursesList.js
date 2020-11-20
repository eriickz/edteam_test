import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap'
import Swal from 'sweetalert2';

import * as Ctrl from '../controller';

function CousersList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    Ctrl.getCoursesList().then(res => {
      setCourses(res.data);
    })
  }, []);

  const deleteCourse = (courseId, courseIndex) => {
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

            const coursesBeforeIndex = courses.slice(0, courseIndex);
            const coursesAfterIndex = courses.slice(courseIndex + 1);

            setCourses(coursesBeforeIndex.concat(coursesAfterIndex));
          }
        })
      }
    })
  }
  
  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-4">Listado de Cursos</h1>
      <Table hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Póster</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Disponible</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
              {courses.map((course, index) => (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.poster}</td>
                  <td>{course.description}</td>
                  <td>{`$${course.price}`}</td>
                  <td>{(course.status) ? 'Si' : 'No'}</td>
                  <td>
                    <Link to={`/cursos/${course.id}`} className="btn btn-success">Editar</Link>
                    <Button variant="danger" className="ml-2" onClick={() => deleteCourse(course.id, index)} >Eliminar</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        <Link to="/cursos/nuevo" className="btn btn-primary mt-2" >Añadir Curso</Link>
      </Table>
    </div>
  );
}

export default CousersList;
