module.exports = {
    "all": true,
    "include": ["api/controllers/**/*.js"], // Only include files in the api/controllers directory
    "reporter": ["html", "text-summary"],
    "report-dir": "./coverage",
    "cache": true,
    "instrument": true,
    "sourceMap": false
  };