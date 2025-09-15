import { useState } from "react";
import { Stack, FormControl, TextField, Select, MenuItem, InputLabel, Button, FormHelperText } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function MenuMasterForm({ onSubmit }) {
  const { 
    handleSubmit, 
    control, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      namamenu: "",
      jenis: "",
      urutan: "",
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={3}>
        {/* Input Nama Menu */}
        <FormControl fullWidth>
          <Controller
            name="namamenu"
            control={control}
            rules={{ required: "Nama Menu wajib diisi." }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nama Menu"
                variant="outlined"
                fullWidth
                error={!!errors.namamenu}
                helperText={errors.namamenu ? errors.namamenu.message : ""}
              />
            )}
          />
        </FormControl>

        {/* Input Jenis */}
        <FormControl fullWidth error={!!errors.jenis}>
          <InputLabel id="jenis-label">Jenis</InputLabel>
          <Controller
            name="jenis"
            control={control}
            rules={{ required: "Jenis wajib dipilih." }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="jenis-label"
                id="jenis"
                label="Jenis"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="File">File</MenuItem>
                <MenuItem value="Folder">Folder</MenuItem>
              </Select>
            )}
          />
          {errors.jenis && <FormHelperText>{errors.jenis.message}</FormHelperText>}
        </FormControl>

        {/* Input Urutan */}
        <FormControl fullWidth>
          <Controller
            name="urutan"
            control={control}
            rules={{
              required: "Urutan wajib diisi.",
              min: {
                value: 1,
                message: "Urutan harus lebih dari 0."
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Urutan"
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.urutan}
                helperText={errors.urutan ? errors.urutan.message : ""}
              />
            )}
          />
        </FormControl>
        
        <Button type="submit" variant="contained" size="large" fullWidth>
          Submit
        </Button>
      </Stack>
    </form>
  );
}