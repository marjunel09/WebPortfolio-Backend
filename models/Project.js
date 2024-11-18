import mongoose from 'mongoose';


const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  liveDemo: String,
  githubRepo: String,
  image: String,
});

const Project = mongoose.model('Project', projectSchema);
export default Project;