import express from 'express';
import dotenv from 'dotenv';
import studentRoutes from './routes/student.routes.js';
import courseRoutes from './routes/course.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import UserRoutes from './routes/user.routes.js';
import { serveSwagger, setupSwagger } from './config/swagger.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.post('/register',UserRoutes);
app.post('/login', UserRoutes); 
app.get('/users', (req, res) => {
    res.status(200).json([{ id: 1, name: 'John Doe'
    }, { id: 2, name: 'Jane Doe' }]);
});
app.use('/docs', serveSwagger, setupSwagger);
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
app.use('/teachers', teacherRoutes);

app.get('/', (req, res) => res.send('Welcome to School API!'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
