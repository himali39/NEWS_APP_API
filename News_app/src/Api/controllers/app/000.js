//  update Language data
const updateNewsLanguage = async (req, res) => {
  try {
    const { userId, languageId, categoryIds } = req.body;

    // Validate input parameters
    if (
      !userId ||
      !languageId ||
      !categoryIds ||
      categoryIds.length === 0 ||
      categoryIds.length > 3
    ) {
      throw new Error("Invalid input parameters");
    }

    // Find the news item by ID
    let updatedNews = await News.findById(newsId);

    // Check if the news item exists
    if (!updatedNews) {
      throw new Error("News not found");
    }

    // Update the language
    updatedNews.languages = [languageId];

    // Update the categories (up to three categories)
    updatedNews.categories = categoryIds.slice(0, 3);

    // Save the updated news item
    updatedNews = await updatedNews.save();

    res.status(200).json({
      success: true,
      updateData: updatedNews,
      message: "News language updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message });
  }
};