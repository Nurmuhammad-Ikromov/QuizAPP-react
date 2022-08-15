import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Container } from '@mui/material';
import API from '../utils/config';

const Home = ({ startChange }) => {
    const [num, setNum] = useState(10);
    const [category, setCategory] = useState(9);
    const [categoryData, setCategoryData] = useState([]);


    const numChange = (event) => {
        setNum(event.target.value);
    };

    const categoryChange = (event) => {
        setCategory(event.target.value);
    };


    useEffect(() => {
        API.get("api_category.php").then((res) => {
            setCategoryData(res.data.trivia_categories)
            setCategory(res.data.trivia_categories[0].id)
        })
    }, []);

    return (
        <div>
            <Container>
                <FormControl variant="standard" sx={{ my: 2, minWidth: 120, width: "100%" }}>
                    <InputLabel id="demo-simple-select-standard-label">Number Of Questions:</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={num}
                        onChange={numChange}
                        label="Age"
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ my: 2, minWidth: 120, width: "100%" }}>
                    <InputLabel id="demo-simple-select-standard-label">Select Category:</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={category}

                        onChange={categoryChange}
                        label="Age"
                    >
                        {categoryData?.map((item) => {
                            return (
                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            )
                        })
                        }
                    </Select>
                </FormControl>

                <Button variant="contained" sx={{ my: 2, width: "100%" }} onClick={() => startChange(num, category)}>Start</Button>
            </Container>
        </div>
    );
}

export default Home;
