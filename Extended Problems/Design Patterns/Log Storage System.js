/* You are given several logs, where each log contains a unique ID and timestamp. Timestamp is a string that has the following format: Year:Month:Day:Hour:Minute:Second, for example, 2017:01:01:23:59:59. All domains are zero-padded decimal numbers.

Implement the LogSystem class:

LogSystem() Initializes the LogSystem object.
void put(int id, string timestamp) Stores the given log (id, timestamp) in your storage system.
int[] retrieve(string start, string end, string granularity) Returns the IDs of the logs whose timestamps are within the range from start to end inclusive. start and end all have the same format as timestamp, and granularity means how precise the range should be (i.e. to the exact Day, Minute, etc.). For example, start = "2017:01:01:23:59:59", end = "2017:01:02:23:59:59", and granularity = "Day" means that we need to find the logs within the inclusive range from Jan. 1st 2017 to Jan. 2nd 2017, and the Hour, Minute, and Second for each log entry can be ignored.


Example 1:

Input
["LogSystem", "put", "put", "put", "retrieve", "retrieve"]
[[], [1, "2017:01:01:23:59:59"], [2, "2017:01:01:22:59:59"], [3, "2016:01:01:00:00:00"], ["2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year"], ["2016:01:01:01:01:01", "2017:01:01:23:00:00", "Hour"]]
Output
[null, null, null, null, [3, 2, 1], [2, 1]]

Explanation
LogSystem logSystem = new LogSystem();
logSystem.put(1, "2017:01:01:23:59:59");
logSystem.put(2, "2017:01:01:22:59:59");
logSystem.put(3, "2016:01:01:00:00:00");

// return [3,2,1], because you need to return all logs between 2016 and 2017.
logSystem.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year");

// return [2,1], because you need to return all logs between Jan. 1, 2016 01:XX:XX and Jan. 1, 2017 23:XX:XX.
// Log 3 is not returned because Jan. 1, 2016 00:00:00 comes before the start of the range.
logSystem.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Hour");*/

class LogSystem {
  constructor() {
      // we can map logs as id => data { different timestamps depending on granularity }
      this.logs = new Map()
      // map each granularity to where its idx ends in the timestamp
      this.granularity = {
          'Year':4,
          'Month':7,
          'Day': 10,
          'Hour': 13,
          'Minute': 16,
          'Second': 19
      }
  }
  put(id, timestamp) {
      const data = {}
      // create a timestamp for each granularity and place it as an object in the logs map
      for (let key in this.granularity) {
          data[key] = timestamp.substring(0, this.granularity[key])
      }
      this.logs.set(id, data)
  }
  retrieve(start, end, granularity) {
      // iterate over the keys and the values within logs
      const res = []
      let startGran = start.substring(0, this.granularity[granularity])
      let endGran = end.substring(0, this.granularity[granularity])
      for (let [id, data] of this.logs.entries()) {
          if (startGran <= data[granularity] && data[granularity] <= endGran) {
              res.push(id)
          }
      }
      return res

  }
}