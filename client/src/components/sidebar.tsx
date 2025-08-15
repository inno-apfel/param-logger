import { TaskList } from '@/components/task_list'

function Sidebar() {

  return (
    <div className="flex flex-col p-2 m-2">
      <TaskList />
      <br></br>
      <p className="shadow-none text-[#86878A] ml-5">
        <strong>Contact Us</strong>
        <br></br>
        <br></br>
        ParamLogger
        <br></br>
        support@paramlogger.com
        <br></br>
        <br></br>
        <img className="invert-40" src="/src/assets/qr_code.svg" alt="qrcode" width="190" />
      </p>
    </div>
  )
}

export { Sidebar }