import supabase from '../lib/supabase'
import { Todo } from '../types/todo'

export default {
  async list () {
    const { data: todos } = await supabase
      .from('todos')
      .select('*')

    return todos as Todo[]
  },

  async setDone (id: number, isDone: boolean) {
    const { data } = await supabase
      .from('todos')
      .update({ is_done: isDone })
      .eq('id', id)

    return data
  }
}
