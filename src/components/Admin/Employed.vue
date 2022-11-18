
<template>
    <div class="body">
        <div class="container">
            <div class="content">
                <div class="cards" v-for="e in employed" :key="'employed' + e.id">
                    <div class="card">
                        <div class="image">
                            <span class="overly"></span>

                            <div class="card-image">
                                <img :src="e.image" alt="" class="card-img">
                            </div>
                        </div>
                        <div class="card-content">
                            <h2 class="name">{{ e.name }}</h2>
                            <br>
                            <p class="descrition"> Email: {{ e.email }}
                            </p>
                            <br>
                            <button class="button">Edit</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import "../../assets/css/employed.css";
</style>

<script>
export default {
    mounted() {
        if (localStorage.user) {
            this.user = JSON.parse(localStorage.user);
            this.form.user_id = this.user.id;
            this.form.companies_id = this.user.companies_id;
        } else {
            this.$router.push({
                name: "Login",
                params: { message: rs.data.message },
            });
        }

        this.employe();

    },
    data() {
        return {
            employed: [],
            alert: "",
            id: null,
            form: {
                image: "",
                name: "",
                email: "",
                companies_id: "",
                user_id: "",
            },
        };
    },

    methods: {
        async employe() {
            let companies_id = this.form.companies_id;

            try {
                let rs = await this.axios.get(
                    `/api/clients/?companies_id=${companies_id}`

                    // {
                    //   headers: { Authorization: "Bearer " + this.token },
                    // }
                );

                this.employed = rs.data.employed_list;
                console.log(rs.data.employed_list);
            } catch (e) {
                console.log(e);
            }
        },

    },
};
</script>
