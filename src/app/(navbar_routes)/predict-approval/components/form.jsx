import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material"
import React from "react"
import GenderSelect from "./gender_select"
import { IndianRupee } from "lucide-react"
import PrimaryButton from "@/components/button"

export default function Form({
  isPredicting,
  buttonDisabled,
  predictApproval,
  textColor,
  isLightTheme,
  input,
  setInput,
}) {
  const roundEdgesSx = {
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: 2,
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderRadius: 2,
    },

    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderRadius: 2,
    },
  }

  const handleChange = (evt) => {
    setInput((prev) => {
      return {
        ...prev,
        [evt.target.name]: parseInt(evt.target.value),
      }
    })
  }

  return (
    <div className="flex min-w-[490px] flex-col gap-5">
      <GenderSelect
        textColor={textColor}
        isLightTheme={isLightTheme}
        input={input}
        setInput={setInput}
      />

      <div className="flex flex-col w-full gap-5">
        <TextField
          sx={roundEdgesSx}
          InputProps={{
            inputProps: {
              min: 1,
            },
          }}
          id="age"
          label="Age"
          variant="outlined"
          type="number"
          placeholder="21"
          name="age"
          value={input.age}
          onChange={handleChange}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-helper-label">
            Education Type
          </InputLabel>
          <Select
            sx={roundEdgesSx}
            name="education"
            value={input.education}
            label="Education Type"
            onChange={handleChange}
          >
            <MenuItem value={3}>Lower Secondary</MenuItem>
            <MenuItem value={4}>Secondary</MenuItem>
            <MenuItem value={1}>Higher</MenuItem>
            <MenuItem value={2}>Incomplete higher</MenuItem>
            <MenuItem value={0}>Academic Degree</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex w-full justify-between">
        <div className="w-[48%]">
          <TextField
            sx={roundEdgesSx}
            id="income"
            label="Income"
            variant="outlined"
            type="number"
            name="income"
            value={input.income}
            onChange={handleChange}
            placeholder="180000"
            InputProps={{
              inputProps: {
                min: 0,
              },
              startAdornment: (
                <InputAdornment position="start">
                  <IndianRupee color={textColor} size={20} />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="w-[48%]">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Income Type
            </InputLabel>
            <Select
              sx={roundEdgesSx}
              name="incomeType"
              value={input.incomeType}
              label="Income Type"
              onChange={handleChange}
            >
              <MenuItem value={3}>Freelancing</MenuItem>
              <MenuItem value={4}>Working</MenuItem>
              <MenuItem value={2}>State Servant</MenuItem>
              <MenuItem value={0}>Commercial Associate</MenuItem>
              <MenuItem value={1}>Pensioner</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="w-[48%]">
          <TextField
            fullWidth
            sx={roundEdgesSx}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            id="years-of-working"
            label="Years of Working"
            variant="outlined"
            type="number"
            value={input.workingExperience}
            name="workingExperience"
            onChange={handleChange}
            placeholder="4"
          />
        </div>

        <div className="w-[48%]">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Job Title
            </InputLabel>
            <Select
              sx={roundEdgesSx}
              name="jobTitle"
              value={input.jobTitle}
              label="Job Title"
              onChange={handleChange}
            >
              <MenuItem value={16}>Security Staff</MenuItem>
              <MenuItem value={14}>Sales Staff</MenuItem>
              <MenuItem value={0}>Accountants</MenuItem>
              <MenuItem value={8}>Laborers</MenuItem>
              <MenuItem value={10}>Managers</MenuItem>
              <MenuItem value={4}>Drivers</MenuItem>
              <MenuItem value={3}>Core Staff</MenuItem>
              <MenuItem value={6}>High Skill Tech Staff</MenuItem>
              <MenuItem value={1}>Cleaning Staff</MenuItem>
              <MenuItem value={12}>Private Service Staff</MenuItem>
              <MenuItem value={2}>Cooking Staff</MenuItem>
              <MenuItem value={9}>Low Skilled Laborers</MenuItem>
              <MenuItem value={11}>Medicine Staff</MenuItem>
              <MenuItem value={15}>Secretaries</MenuItem>
              <MenuItem value={17}>Waiter Staff</MenuItem>
              <MenuItem value={5}>Hr Staff</MenuItem>
              <MenuItem value={13}>Realty Agent</MenuItem>
              <MenuItem value={7}>IT Staff</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="w-full">
        <TextField
          sx={roundEdgesSx}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
          fullWidth
          value={input.totalBadDebt}
          id="total-bad-debt"
          label="Total Bad Debt"
          variant="outlined"
          type="number"
          name="totalBadDebt"
          onChange={handleChange}
          placeholder="0"
        />
      </div>
      <div className="w-full">
        <TextField
          sx={roundEdgesSx}
          InputProps={{
            inputProps: {
              min: 1,
            },
          }}
          fullWidth
          id="family_members"
          label="Total Family Members"
          variant="outlined"
          type="number"
          value={input.totalFamilyMembers}
          name="totalFamilyMembers"
          onChange={handleChange}
          placeholder="5"
        />
      </div>
      <div className="flex w-full justify-between">
        <div className="w-[35%]">
          <FormControl className="w-full">
            <FormLabel id="demo-radio-buttons-group-label">
              Owned realty?
            </FormLabel>
            <RadioGroup
              sx={{
                // backgroundColor: "red",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
              onChange={handleChange}
              value={input.ownedRealty}
              row
              aria-labelledby="owned-realty-radio-buttons-group-label"
              name="ownedRealty"
            >
              <FormControlLabel value={1} control={<Radio />} label="Yes" />
              <FormControlLabel value={0} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="w-[48%]">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Housing Type
            </InputLabel>
            <Select
              sx={roundEdgesSx}
              name="housingType"
              value={input.housingType}
              label="Housing Type"
              onChange={handleChange}
            >
              <MenuItem value={1}>House / apartment</MenuItem>
              <MenuItem value={4}>Rented apartment</MenuItem>
              <MenuItem value={2}>Municipal apartment</MenuItem>
              <MenuItem value={5}>With parents</MenuItem>
              <MenuItem value={0}>Co-op apartment</MenuItem>
              <MenuItem value={3}>Office apartment</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <PrimaryButton
        isLightTheme={isLightTheme}
        clickFunction={predictApproval}
        disabled={buttonDisabled}
        width="100%"
        height="40px"
        buttonText={isPredicting ? "Predicting..." : "Predict"}
      />
    </div>
  )
}
