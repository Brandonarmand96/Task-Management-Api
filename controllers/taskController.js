const supabase = require('../config/supabase');

exports.getAllTasks = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    res.status(200).json({ success: true, data, count: data.length });
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('tasks').select('*').eq('id', id).maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) return res.status(404).json({ error: 'Not Found', message: 'Task not found' });

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const taskData = {
      title: req.body.title,
      description: req.body.description || '',
      status: req.body.status || 'pending',
      priority: req.body.priority || 'medium',
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from('tasks').insert([taskData]).select().single();
    if (error) throw new Error(error.message);

    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updated_at: new Date().toISOString() };

    const { data, error } = await supabase.from('tasks').update(updateData).eq('id', id).select().maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return res.status(404).json({ error: 'Not Found', message: 'Task not found' });

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('tasks').delete().eq('id', id).select().maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return res.status(404).json({ error: 'Not Found', message: 'Task not found' });

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};