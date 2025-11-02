const Demo = () => {
  return(
    <div className="min-h-[65vh] w-screen bg-[url('/images/bg2.png')] bg-cover sm:bg-contain bg-center bg-no-repeat overflow-x-hidden">
      
      <div className="text-white-500 text-4xl background-blur-xl width-full bg-black/30 mx-20 border border-white/30 rounded-[20px] shadow-lg p-4 text-center my-5 lg:text-[100px] lg:border-none lg:bg-gradient-to-t bg-gradient-to-b from-black/10 via-black/50 to-transparent " style={{fontFamily: "'Instrument Serif', serif"}}>
        Why SecureX?
      </div>

      <div className="font-sans py-1 text-center mx-auto">
        <div className="hidden md:block text-2xl mx-70">
          See it in action, watch how effortlessly you can generate uncrackable passwords, save them securely in your personal vault, and find them in seconds. A quick glimpse at the speed, simplicity, and privacy that define SecureX.
        </div>
        <div className="text-sm inline-block md:hidden mx-10 mb-5">
          Generate uncrackable passwords, store them securely, and access them in seconds.<br/> 
          Fast, simple, and private, that’s SecureX.”
        </div>
      </div>
        
      <div className="block width-full flex justify-center lg:my-10">
        <video className="width-full" width="800" height="460px" controls>
          <source src="/videos/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

    </div>
  )
}

export default Demo;
