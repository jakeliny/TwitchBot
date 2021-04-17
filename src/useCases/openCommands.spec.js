const openCommands = require("./openCommands.js")

const mockClient = {
  say(target, message){
    return `${target}: ${message}`
  }
}

describe("Open Commands Use Case", () => {
  it("should to be able call command list", () => {
    const result = openCommands(mockClient)("botName", "viewerName", "!help", false )
    console.log(result)
  })
})