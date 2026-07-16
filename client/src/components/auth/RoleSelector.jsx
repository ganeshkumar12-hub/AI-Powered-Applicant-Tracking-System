import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";

function RoleSelector({
  role,
  company,
  onChange,
}) {
  return (
    <>
      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Select Role</FormLabel>

        <RadioGroup
          row
          name="role"
          value={role}
          onChange={onChange}
        >
          <FormControlLabel
            value="applicant"
            control={<Radio />}
            label="Applicant"
          />

          <FormControlLabel
            value="recruiter"
            control={<Radio />}
            label="Recruiter"
          />
        </RadioGroup>
      </FormControl>

      {role === "recruiter" && (
        <TextField
          fullWidth
          margin="normal"
          label="Company Name"
          name="company"
          value={company}
          onChange={onChange}
        />
      )}
    </>
  );
}

export default RoleSelector;