import React, { useState } from 'react';
import { Box, TextField, TextareaAutosize, Button } from '@material-ui/core'
import agent from '../../app/api/agent';
const ProductEdit = (props) => {
    const [item, setItem] = useState(props.location.aboutProps.item);
    const SetImagesHandler = (imageUrl, index) => {
        let new_item = [{ ...item }];
        console.log(`imgUrlOld: ${new_item[0].images[index].imageUrl}`);
        new_item[0].images[index].imageUrl = imageUrl;
        setItem(new_item[0]);
        new_item = [];
        console.log(item)
    }
    const EditButtonHandler = () => {
        console.log(item.mainImage);
        agent.Products.update(item.productId, item);
    }
    return (
        <>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                marginLeft="auto"
                marginRight="auto"
                marginBottom="auto"
                marginTop="auto"
                flexWrap="wrap"
                style={{ border: '1px solid blueviolet', paddingTop: '70px', paddingLeft: '60px' }}
            >
                <Box
                    justifyContent="space-between"
                    flexDirection="row" display="flex"
                    flexWrap="wrap">
                    <Box color="inherit" display="flex" flexDirection="column" justifyContent="space-between" >
                        <TextField
                            variant="outlined"
                            margin="none"
                            required={true}
                            fullWidth
                            autoFocus
                            value={item.title}
                            label="Title"
                            InputLabelProps={{ shrink: true }}
                            onChange={(event) => { setItem({ ...item, 'title': event.target.value }) }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                            label="Name"
                            value={item.name}
                            InputLabelProps={{ shrink: true }}
                            onChange={(event) => { setItem({ ...item, 'name': event.target.value }) }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                            label="Category"
                            value={item.category}
                            InputLabelProps={{ shrink: true }}
                            onChange={(event) => { setItem({ ...item, 'category': event.target.value }) }}
                        />
                        <TextareaAutosize
                            placeholder="Description"
                            rowsMin={3}
                            defaultValue={item.description}
                            onChange={(event) => { setItem({ ...item, 'description': event.target.value }) }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                            label="MainImage"
                            value={item.mainImage}
                            InputLabelProps={{ shrink: true }}
                            onChange={(event) => { setItem({ ...item, 'mainImage': event.target.value }) }}
                        />
                        <Box>
                            {item.images === null || typeof (item.images) === 'undefined' ? null : Object.keys(item.images).map((key, i) => {
                                return (
                                    <>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoFocus
                                            label="Images"
                                            value={item.images[key].imageUrl}
                                            InputLabelProps={{ shrink: true }}
                                            onChange={(event) => { SetImagesHandler(event.target.value, i); }}
                                        />
                                    </>
                                )
                            }
                            )
                            }
                        </Box>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoFocus
                            label="Price"
                            value={item.price}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                </Box>
                <Box>
                    <Button variant="contained" color="secondary" onClick={EditButtonHandler}>
                        Edit
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default ProductEdit;
