import Project from '../models/Project.js';

export const addProject = async (req, res) => {
  const { title, description, technologies, liveDemo, githubRepo } = req.body;
  try {
    if (!title || !description || !technologies) {
      return res.status(400).json({ error: 'Title, description, and technologies are required' });
    }

    const newProject = new Project({
      title,
      description,
      technologies,
      liveDemo,
      githubRepo
    });

    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add project' });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};
