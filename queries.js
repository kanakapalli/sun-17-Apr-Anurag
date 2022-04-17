const Pool = require('pg').Pool
// connection her
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vamstar',
  password: 'Anurag1997',
  port: 5432,
})

const updatebmi = async (request, response) => {
  console.log("updatebmi")

  await pool.query(`update userdata set bmi =
	case 
		when bmi IS  NULL then weightkg / POWER(heightcm / 100, 2)
		else bmi
	end`, (error, results) => {
    if (error) {
      console.log("error")
      throw error
    }else{
      console.log("status")

    response.status(200).json(results.rows)
    }
  });
  console.log("updatebmi")


}


const getdata = async (request, response) => {
  console.log("getdata")
  await updatebmi();
  await pool.query(`update userdata 
  set bmicategory =
    case 
		when bmicategory IS NOT NULL then bmicategory
        when   18.4 >= bmi then 'Underweight'
        when (bmi >= 18.5 and bmi <= 24.9) then 'Normal weight'
        when (bmi >= 25 and bmi <= 29.9) then 'Overweight'
		when (bmi >= 30 and bmi <= 34.9) then 'Moderately obese'
		when (bmi >= 35.0 and bmi <= 39.9)then 'Severel obese'
		when bmi >= 40 then 'Very severely obese'
    end, healthrisk =
	case 
		when healthrisk IS NOT NULL then healthrisk
        when   18.4 >= bmi then 'Malnutrition risk,'
        when (bmi >= 18.5 and bmi <= 24.9) then 'Low risk,'
        when (bmi >= 25 and bmi <= 29.9) then 'Enhanced risk'
		when (bmi >= 30 and bmi <= 34.9) then 'Medium risk,'
		when (bmi >= 35.0 and bmi <= 39.9)then 'High'
		when bmi >= 40 then 'Very high risk'
    end
	`,
     (error, results) => {
    if (error) {
      console.log("error")

      throw error
    }else{
      pool.query(`select * from userdata`, (error, results) => {
    if (error) {
      console.log("error")

      throw error
    }
    response.status(200).json(results.rows)
  })

    }
  })
}

module.exports = {
  updatebmi,
  getdata,
}
