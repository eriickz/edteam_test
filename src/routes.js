import CourseForm from "./components/CourseForm";
import CoursesList from "./components/CoursesList";

const routes = [
    { path: '/', exact: true, component: CoursesList },
    { path: '/cursos', exact: true, component: CoursesList },
    { path: '/cursos/nuevo', exact: true, component: CourseForm },
    { path: '/cursos/:courseId', exact: true, component: CourseForm },
];

export default routes;