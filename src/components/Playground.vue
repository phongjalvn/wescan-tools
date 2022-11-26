<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <div class="text-h5 mb-4">Description</div>
        <editor
          api-key="no-api-key"
          :init="{
            height: 200,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
          }"
          v-model="description"
        />
        <v-divider class="my-4" />
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(question, index) in questions"
            :key="index"
          >
            <v-expansion-panel-header>
              Question {{ index + 1 }}
              <v-spacer />
              <v-btn small @click="questions.splice(index, 1)"> Xóa </v-btn>
              <v-spacer />
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="text-h5 mb-4">Question:</div>
              <editor
                api-key="no-api-key"
                :init="{
                  height: 300,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                }"
                v-model="question.content"
              />
              <v-checkbox
                v-model="question.required"
                :label="`required: ${question.required.toString()}`"
              ></v-checkbox>
              <v-text-field
                v-if="question.required"
                label="require message"
                v-model="question.requiredMsg"
              ></v-text-field>
              <div class="text-h5 mb-4">Câu trả lời</div>
              <div class="ml-8">
                <div
                  v-for="(item, i) in question.items"
                  :key="`item-${index}-${i}`"
                >
                  <v-text-field
                    label="name"
                    v-model="item.content"
                  ></v-text-field>
                  <v-text-field
                    label="value"
                    v-model="item.value"
                    append-icon="mdi-minus"
                    @click:append="question.items.splice(i, 1)"
                  ></v-text-field>
                </div>
                <div class="d-flex my-4">
                  <v-btn color="primary" @click="addAnswer(question)"
                    >Thêm câu trả lời</v-btn
                  >
                </div>
              </div>
              <div class="text-h5 mb-4">Props</div>
              <div class="ml-8">
                <v-row
                  no-gutters
                  v-for="(prop, propIndex) in question.props"
                  :key="`prop-${index}-${propIndex}`"
                >
                  <v-col
                    v-for="(value, key) in prop"
                    :key="`prop-val-${index}-${propIndex}-${key}`"
                  >
                    {{ value }}:{{ key }}
                    <v-btn
                      icon
                      small
                      @click="question.props.splice(propIndex, 1)"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    <v-text-field
                      label="key"
                      v-model="tmpQPropKey"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="value"
                      v-model="tmpQPropValue"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn
                      small
                      icon
                      color="primary"
                      @click="addQuestionProps(question)"
                      >+</v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-divider class="my-4" />
        <div class="d-flex">
          <v-btn color="error" @click="exportJSON">Export</v-btn>
          <v-spacer />
          <v-btn color="primary" @click="addQuestion">Thêm câu hỏi</v-btn>
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="text-h5 mb-4">JSON</div>
        <v-textarea label="JSON" v-model="jsonString"></v-textarea>
        <div class="d-flex">
          <v-spacer />
          <v-btn color="error" @click="addQuestion">Import</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "playground",
  data: () => ({
    description: "",
    questions: [],
    tmpQPropKey: "",
    tmpQPropValue: "",
    tmpAPropKey: "",
    tmpAPropValue: "",
    jsonString: "",
  }),
  methods: {
    addQuestion() {
      this.questions.push({
        type: "radio",
        content: "",
        required: false,
        requiredMsg: "",
        items: [],
        props: [],
      });
    },
    addAnswer(question) {
      question.items.push({
        name: "",
        value: "",
        props: [],
      });
    },
    addQuestionProps(question) {
      const newProps = {};
      newProps[this.tmpQPropKey] = this.tmpQPropValue;
      question.props.push(newProps);
      this.tmpQPropKey = "";
      this.tmpQPropValue = "";
    },
    exportJSON() {
      this.jsonString = JSON.stringify({
        description: this.description,
        questions: this.questions,
      });
    },
    importJSON() {
      const parsedContent = JSON.parse(this.jsonString);
      this.description = parsedContent.description;
      this.$set(this, "questions", parsedContent.questions);
    },
  },
};
</script>
