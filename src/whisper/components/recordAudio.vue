   <template>

    <div>

      <vs-row vs-justify="center">
        <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
          <vs-card>
            <div slot="header">
              <h3>
                Convert audio to text
              </h3>
            </div>
            <div>
              <div class="timer">
                <h3>{{timer}}</h3>
              </div>
              <vs-button color="success" type="filled" @click="recordAudio()" style="margin-right: 10px;">Record</vs-button>

              <vs-button color="danger" type="filled" @click="stop()">Stop</vs-button>

              <div class="response_text">
                <p>{{ response.text }}</p>
              </div>
            </div>

          </vs-card>
        </vs-col>
      </vs-row>


    </div>
  </template>
  <script>
  import moment from 'moment';
  export default {
    data() {
      return {
        recorder: null,
        chunks: [],
        device: null,
        blobObj: null,
        timer: 0,
        response: [],
        intervalId: ''
      };
    },
  
    created() {
      this.device = navigator.mediaDevices.getUserMedia({ audio: true });
    },
    methods: {
      
      recordAudio() {
        console.log('record')
        let me = this

        this.intervalId = setInterval(function() {
          me.timer ++
        }, 1000);

        this.device.then((stream) => {
          this.recorder = new MediaRecorder(stream);
          this.recorder.ondataavailable = (e) => {
            this.chunks.push(e.data);
            if (this.recorder.state === "inactive") {
              let blob = new Blob(this.chunks, { type: "audio/mp3" });
              // save to blobObj
              this.blobObj = blob;
              this.chunks = [];
              console.log('this.blobObj', this.blobObj)
              this.sendAudio()
              this.blobObj = null;
            }
          };
          // start
          this.recorder.start();
        });
      },
      stop() {
        // stop
        console.log('stop')
        clearInterval(this.intervalId);
        this.timer = 0
        this.recorder.stop();
        
      },

      sendAudio(){
        this.$vs.loading()
        this.response = []
        const formData = new FormData();
        const currentDateTime = moment().format('YYYYMMDD_HHmmss');
        var name = `audio_${currentDateTime}.mp3`;
        formData.append('audio', this.blobObj, name);

        this.$http.post('/whisper/process_audio', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${process.env.VUE_APP_AUTHORIZATION_TOKEN}`
          },
        })
        .then(response => {
          this.$vs.loading.close()
          console.log(response.data);
          this.response = response.data.response
        })
        .catch(error => {
          this.$vs.loading.close()
          console.error(error);
        });

      }


    },
  };
  </script>

<style scoped>
.timer{
  margin-bottom:5%
}

.response_text{
  margin-top:5%; 
  margin-bottom:5%
}
</style>