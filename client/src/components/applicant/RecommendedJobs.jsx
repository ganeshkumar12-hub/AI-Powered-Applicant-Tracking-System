import {

  Paper,

  Typography,

  Stack,

  Button,

  Chip,

} from "@mui/material";



const jobs = [

  {

    company: "Google",

    title: "Frontend Developer",

    location: "Bangalore",

    type: "Full Time",

  },

  {

    company: "Microsoft",

    title: "Java Developer",

    location: "Hyderabad",

    type: "Full Time",

  },

  {

    company: "Infosys",

    title: "Python Developer",

    location: "Pune",

    type: "Hybrid",

  },

  {

    company: "Amazon",

    title: "React Developer",

    location: "Chennai",

    type: "Remote",

  },

];



function RecommendedJobs() {

  return (

    <Paper

      elevation={3}

      sx={{

        mt: 4,

        p: 3,

        borderRadius: 4,

      }}

    >

      <Typography

        variant="h5"

        fontWeight="bold"

        mb={3}

      >

        🔥 Recommended Jobs

      </Typography>



      <Stack spacing={2}>

        {jobs.map((job, index) => (

          <Paper

            key={index}

            variant="outlined"

            sx={{

              p: 2,

              borderRadius: 3,

            }}

          >

            <Typography

              variant="h6"

              fontWeight="bold"

            >

              {job.title}

            </Typography>



            <Typography color="text.secondary">

              {job.company}

            </Typography>



            <Stack

              direction="row"

              spacing={1}

              mt={1}

            >

              <Chip

                label={job.location}

                color="primary"

              />



              <Chip

                label={job.type}

                color="success"

              />

            </Stack>



            <Button

              variant="contained"

              sx={{ mt: 2 }}

            >

              Apply Now

            </Button>

          </Paper>

        ))}

      </Stack>

    </Paper>

  );

}



export default RecommendedJobs;