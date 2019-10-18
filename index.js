module.exports = async (fn, ...args) => {
  const channels = [undefined, undefined]

  try {
    channels[1] = await fn.apply(null, args)
  }
  catch (err) {
    channels[0] = err
  }
  finally {
    return channels
  }
}