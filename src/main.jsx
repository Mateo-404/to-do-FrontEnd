import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { TextField, Button, Paper, Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function App() {
    const [tareas, setTareas] = useState({
        porHacer: [],
        enProgreso: [],
        hecho: []
    });
    const [dialogoAbierto, setDialogoAbierto] = useState(false);
    const [nuevaTarea, setNuevaTarea] = useState({
        titulo: '',
        estado: 'porHacer'
    });

    const abrirDialogo = () => {
        setDialogoAbierto(true);
    };

    const cerrarDialogo = () => {
        setDialogoAbierto(false);
    };

    const manejarCambio = (event) => {
        setNuevaTarea({
            ...nuevaTarea,
            [event.target.name]: event.target.value
        });
    };

    const agregarTarea = () => {
        if (nuevaTarea.titulo) {
            setTareas({
                ...tareas,
                [nuevaTarea.estado]: [...tareas[nuevaTarea.estado], nuevaTarea.titulo]
            });
            setNuevaTarea({
                titulo: '',
                estado: 'porHacer'
            });
            cerrarDialogo();
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '16px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <Paper sx={{ padding: '16px', width: '30%' }}>
                    <Typography variant="h6">Por Hacer</Typography>
                    {tareas.porHacer.map((tarea, index) => (
                        <Typography key={index}>{tarea}</Typography>
                    ))}
                </Paper>
                <Paper sx={{ padding: '16px', width: '30%' }}>
                    <Typography variant="h6">En Progreso</Typography>
                    {tareas.enProgreso.map((tarea, index) => (
                        <Typography key={index}>{tarea}</Typography>
                    ))}
                </Paper>
                <Paper sx={{ padding: '16px', width: '30%' }}>
                    <Typography variant="h6">Hecho</Typography>
                    {tareas.hecho.map((tarea, index) => (
                        <Typography key={index}>{tarea}</Typography>
                    ))}
                </Paper>
            </Box>

            <IconButton 
                color="primary" 
                onClick={abrirDialogo} 
                sx={{ position: 'fixed', bottom: '16px', right: '16px', width: 56, height: 56 }}
            >
                <AddIcon />
            </IconButton>

            <Dialog open={dialogoAbierto} onClose={cerrarDialogo}>
                <DialogTitle>Agregar Tarea</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Título de la Tarea"
                        fullWidth
                        name="titulo"
                        value={nuevaTarea.titulo}
                        onChange={manejarCambio}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Estado"
                        fullWidth
                        name="estado"
                        value={nuevaTarea.estado}
                        onChange={manejarCambio}
                        SelectProps={{ native: true }}
                    >
                        <option value="porHacer">Por Hacer</option>
                        <option value="enProgreso">En Progreso</option>
                        <option value="hecho">Hecho</option>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cerrarDialogo}>Cancelar</Button>
                    <Button onClick={agregarTarea}>Agregar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
