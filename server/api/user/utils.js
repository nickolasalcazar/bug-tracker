module.exports = {
  /**
   * Appends a unique suffix to base string.
   * @param {string} base
   */
  appendUniqueSuffix: (base) => {
    const suffix = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    return `${base}-${suffix}`;
  },
};
