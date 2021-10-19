//----------------------------------------------------------------------------------------------------------------------
// Bootstrap5 Tooltip setup
//----------------------------------------------------------------------------------------------------------------------


// Add tooltips, this could be more efficient by manually adding them where necessary.
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});


//----------------------------------------------------------------------------------------------------------------------
// Typeahead
//----------------------------------------------------------------------------------------------------------------------


const measureMapping = {"Activity Fragmentation": "activity_fragmentation", "Cosinor Single Component Acrophase": "one_component_acrophase", "Cosinor Multi Component Acrophase": "multi_component_acrophase", "Cosinor Single Component Mesor": "one_component_mesor", "Cosinor Multi Component Mesor": "multi_component_mesor", "Cosinor Single Component Amplitude": "one_component_amplitude", "Cosinor Multi Component Amplitude": "multi_component_amplitude", "Cosinor Number of Components": "multi_component_n", "Raw Fridge Usage": "fridge_usage", "Fridge Usage Epochs": "fridge_usage_5min_epochs", "Daily Outing Number": "outing_count", "Daily Total Outing Duration": "outing_duration", "Daily Visit Score": "visit_score", "Daily Number of Entrance Door Events": "number_entrance_door_events", "Daily Time of Day Entrance Door": "entrance_door_tod", "Daily Time of Day Fridge Door": "fridge_door_tod", "Daily Bathroom Usage Number": "toilet_usage_number", "Bathroom Usage Time of Day": "toilet_usage_tod", "Intradaily Variability": "intradaily_variability", "Intradaily Stability": "intradaily_stability", "Spectral Entropy of Activity": "spectral_entropy", "LF-HF Power Ratio": "lfhf", "Wavelet Variance": "wavelet_variance", "Normalized Activity Bandpowers": "norm_amplitude", "Fridge Usage Entropy": "entropy_fridge", "Entrance Door Entropy": "entropy_entrance", "PIR Activity Entropy": "total_entropy", "Eigenbehavior Reconstruction Error": "pir_reconstruction_error", "Activity Island Number": "activity_island_count", "Activity Island Duration": "activity_island_duration", "Activity Counts": "activity_counts", "Raw Activity": "raw_activity_sum_seconds", "Daily Room-Transition Counts": "transition_count", "Daily Mean Room-Transition Duration": "mean_transition_duration", "Daily Mean Room-Transition Duration Morning": "mean_morning_transition_duration", "Daily Mean Room-Transition Duration Evening": "mean_evening_transition_duration", "Daily Mean Room-Transition Duration Ratio": "morning_evening_transition_ratio", "Daily Mean Room-Transition Duration Ratio Deviation": "deviation_from_even_ratio", "Nightly Heart Rate Summary Statistics": "bed_hr", "Nocturnal Heart Rate Dipping": "bed_hr_q75_q25", "Nightly Heart Rate Average Power": "bed_hr_power", "Nightly Heart Rate Spectral Entropy": "bed_hr_spectral_entropy", "Nightly Respiration Rate Summary Statistics": "bed_rr", "Nocturnal Respiration Rate Dipping": "bed_rr_q75_q25", "Nightly Respiration Rate Average Power": "bed_rr_power", "Nightly Respiration Rate Spectral Entropy": "bed_rr_spectral_entropy", "Nightly Bed Activity Summary Statistics": "bed_act", "Nightly Bed Activity Average Power": "bed_act_power", "Nightly Bed Activity Spectral Entropy": "bed_act_spectral_entropy", "In-Bed Activity Island Count": "bed_number_activity_islands", "In-Bed Activity Island Duration Statistics": "bed_activity_island_duration", "In-Bed Arousal Counts": "n_arousal_transitions", "In-Bed Arousal Probability": "arousal_probability", "Percentage Active in Bed": "percentage_active_in_bed", "Duration Total": "bed_duration", "Duration In-Bed": "bed_duration_in_bed", "Nightly Bed-exit Count": "bed_bedexit_count", "Number of Toss-and-Turns per Night": "bed_tossnturn_count", "Average In-Bed Heart Rate": "bed_avg_hr", "Average In-Bed Respiration Rate": "bed_avg_rr", "Average In-Bed Activity": "bed_avg_act", "Nightly Duration Asleep": "bed_duration_in_sleep", "Nightly Duration Awake In-Bed": "bed_duration_awake", "Sleep Onset Delay": "bed_duration_sleep_onset", "Nightly Bedexit Duration": "bed_bedexit_duration", "Nightly REM Sleep Duration": "bed_duration_in_rem", "Nightly Light Sleep Duration": "bed_duration_in_light", "Nightly Deep Sleep Duration": "bed_duration_in_deep", "Nightly Heart Rate Variability LF": "bed_hrv_lf", "Nightly Heart Rate Variability HF": "bed_hrv_hf", "Number of Awakenings per Night": "bed_awakenings", "Percentage in Deep Sleep": "bed_percentage_deep", "Percentage in Light Sleep": "bed_percentage_light", "Percentage in REM Sleep": "bed_percentage_rem", "Percentage Awake": "bed_percentage_awake", "Sleep Efficiency": "bed_sleep_efficiency", "Bed-exit Duration Statistics": "bed_bedexit_duration_median", "Nightly Nocturia Count": "bed_nocturia_count", "Average Nightly Heart Rate during Awake State": "bed_awake_sleep_hr", "Average Nightly Respiration Rate during Awake State": "bed_awake_sleep_rr", "Average Nightly Activity during Awake State": "bed_awake_sleep_act", "Average Nightly Heart Rate during Deep Sleep": "bed_deep_sleep_hr", "Average Nightly Respiration Rate during Deep Sleep": "bed_deep_sleep_rr", "Average Nightly Activity during Deep Sleep": "bed_deep_sleep_act", "Average Nightly Heart Rate during Light Sleep": "bed_light_sleep_hr", "Average Nightly Respiration Rate during Light Sleep": "bed_light_sleep_rr", "Average Nightly Activity during Light Sleep": "bed_light_sleep_act", "Average Nightly Heart Rate during REM Sleep": "bed_rem_sleep_hr", "Average Nightly Respiration Rate during REM Sleep": "bed_rem_sleep_rr", "Average Nightly Activity during REM Sleep": "bed_rem_sleep_act", "Sleep Reconstruction Error": "sleep_reconstruction_error", "One Minute Scale Heart Rate": "bed_heart_rate_1min_scale", "One Minute Scale Respiration Rate": "bed_respiration_rate_1min", "One Minute Scale In-Bed Activity": "bed_activity_1min"};
const measureNames = Object.keys(measureMapping);

const substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;
        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};


$('#search .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'measureNames',
        source: substringMatcher(measureNames)
    });

//----------------------------------------------------------------------------------------------------------------------
// Zenscroll
//----------------------------------------------------------------------------------------------------------------------

const edgeOffset = 65 // px - funnily enough this also fixes the offset of hrefs...
setTimeout(function() { zenscroll.setup(null, edgeOffset); }, 100);

$('#search').on('typeahead:selected', function (e, datum) {
    let div = document.getElementById(measureMapping[datum])
    zenscroll.to(div);
});

$('#search_derivates').on('typeahead:selected', function (e, datum) {
    let div = document.getElementById(derivate_mapping[datum])
    zenscroll.to(div);
});


//----------------------------------------------------------------------------------------------------------------------
// Plotly
//----------------------------------------------------------------------------------------------------------------------

const derivate_mapping = {}

const CORRELATION_PRETTY_PRINT_MAP = {
    "EdmontFrailty": "Edmonton Frail Scale",
    "POMAb": "POMA Balance",
    "POMAg": "POMA Gait",
    "age": "Age",
    "bg": "POMA",
    "eq_5d_anxiety_depression": "EQ5D - Anxiety & Depression",
    "eq_5d_mobility": "EQ5D - Mobility",
    "eq_5d_pain_discomfort": "EQ5D - Pain & Discomfort",
    "eq_5d_selfcare": "EQ5D - Selfcare",
    "eq_5d_usual_activities": "EQ5D - Usual Activities",
    "feels_healthy": "Participant Feels Healthy",
    "feels_sad": "Participant Feels Sad",
    "feels_tired": "Participant Feels Tired",
    "gds_score": "Geriatric Depression Scale",
    "handgrip_right": "Right Hand Grip-Strength [kg]",
    "handgrip_left": "Left Hand Grip-Strength [kg]",
    "hip_right": "Right Hip Flexor-Strength [kg]",
    "hip_left": "Left Hip Flexor-Strength [kg]",
    "knee_right": "Right Knee Extensor-Strength [kg]",
    "knee_left": "Left Knee Extensor-Strength [kg]",
    "health_scale": "EQ5D - EQ-VAS",
    "moca_score": "Montreal Cognitive Assessment",
    "standard_tug": "Timed Up and Go Test"
}

const connect_distribution_data_listeners = function(measures) {

    measures.forEach( (measure) => {
       const measureName = measure.measure_label;
       const graphEl = document.getElementById('graph_collapse_histogram_' + measureName);
       const select = document.getElementById("histogram_selector_" + measureName);
       measure.children.forEach( (child) => {
           const childName = child.measure_label;
           derivate_mapping[childName] = measureName;
           select.add(new Option(childName, childName));
       });

       select.addEventListener("change", function () {
            const child = measure.children.find(e => e.measure_label === this.value);
            const trace = {
                x: child.data,
                type: 'histogram',
            };
            const data = [trace];
            Plotly.newPlot(graphEl, data);
        });
    });

    $('#search_derivates .typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'derivateMeasureNames',
            source: substringMatcher(Object.keys(derivate_mapping))
        });

};


const connect_correlations_data_listeners = function(measures) {

    measures.forEach((measure) => {
        const measureName = measure.measure_label;
        const collapseEl = document.getElementById("correlations_" + measureName);

        collapseEl.addEventListener("click", () => {
            const graphEl = document.getElementById('graph_collapse_correlations_' + measureName);
            const contentContainerEl = document.getElementById(measureName);
            const nCorrs = Object.keys(measure.children[0].correlations).length;
            const nChildren = measure.children.length;
            const corrMatrix = Array(nChildren).fill().map(()=>Array(nCorrs).fill());
            const pMatrix = Array(nChildren).fill().map(()=>Array(nCorrs).fill());
            const xNames = [];
            const yNames = [];

            for (let i = 0; i < nChildren; i++) {
                for (let j = 0; j < nCorrs; j++) {

                    corrObj = Object.values(measure.children[i].correlations)[j];
                    if (nCorrs !== Object.keys(measure.children[i].correlations).length) {
                        continue;
                    }

                    corrMatrix[i][j] = corrObj.r;
                    pMatrix[i][j] = corrObj.p;
                    if (i === nChildren - 1) {
                        // assuming corrs are the same for all children
                        xNames[j] = CORRELATION_PRETTY_PRINT_MAP[Object.keys(measure.children[i].correlations)[j]] + ` (n=${corrObj.n})`;
                    }
                }
                yNames[i] = measure.children[i].measure_label;
            }

            const data = [
                {
                    z: corrMatrix,
                    x: xNames,
                    y: yNames,
                    zmin: -1,
                    zmax:1,
                    type: 'heatmap',
                    customdata: pMatrix,
                    hoverongaps: false,
                    hovertemplate: `<i>r\:</i> %{z:.2f} (<i>p</i>=%{customdata:.3f})<extra></extra>`,
                    colorscale: [
                        [0, 'rgb(5,10,172)'], [0.35, 'rgb(106,137,247)'],
                        [0.5, 'rgb(255,255,255)'], [0.6, 'rgb(232,150,124)'],
                        [0.7, 'rgb(227,104,60)'], [1, 'rgb(236,8,32)']
                    ]
                }
            ];

            const layout = {
                autosize: true,
                width: contentContainerEl.offsetWidth,
                //height: "auto",//(nChildren < 2) ? 500 : nChildren*50 + 300,
                margin: {
                    t: 30,
                },
                yaxis: {
                    automargin: true
                },
                xaxis: {
                    automargin: true
                }
            };

            Plotly.newPlot(graphEl, data, layout);
        });
    });
}

const draw_mci_heatmap = function(mci_profile_obj) {

    const layout = {
        autosize: false,
        width: "auto",
        height: 1080,
        margin: {
            l: 400,
            r: 50,
            b: 50,
            t: 10,
            pad: 4
        }
    }

    const data = [
        {
            z: mci_profile_obj.matrix,
            x: ["Regular", "MCI"],
            y: mci_profile_obj.categories_y, //.map((e) => { return `<a href="#about">${e}</a>`}),
            type: 'heatmap',
            //colorscale: [
            //    [0, 'rgb(36,162,147)'], [0.35, 'rgb(167,211,213)'],
            //    [0.5, 'rgb(255,255,255)'], [0.6, 'rgb(227,193,216)'],
            //    [0.7, 'rgb(213,144,193)'], [1, 'rgb(199,92,170)']
            //],
            colorscale: [
                [0, 'rgb(5,10,172)'], [0.35, 'rgb(106,137,247)'],
                [0.5, 'rgb(255,255,255)'], [0.6, 'rgb(232,150,124)'],
                [0.7, 'rgb(227,104,60)'], [1, 'rgb(236,8,32)']
            ],
            //colorscale: [
            //    [0, 'rgb(17,49,56)'], [0.35, 'rgb(47,166,195)'],
            //    [0.5, 'rgb(255,255,255)'], [0.6, 'rgb(232,150,124)'],
            //    [0.7, 'rgb(227,104,60)'], [1, 'rgb(236,8,32)']
            //]
            hoverongaps: false
        }
    ];

    const div = document.getElementById('mci_profile_example')
    Plotly.newPlot(div, data, layout);
};


const draw_poma_heatmap = function(obj) {

    const layout = {
        autosize: false,
        width: "auto",
        height: 1080,
        margin: {
            l: 400,
            r: 50,
            b: 100,
            t: 10,
            pad: 4
        }
    }

    const data = [
        {
            z: obj.matrix,
            x: ["High Fall-Risk", "Moderate-Low Fall-Risk"],
            y: obj.categories_y, //.map((e) => { return `<a href="#about">${e}</a>`}),
            type: 'heatmap',
            colorscale: [
                [0, 'rgb(5,10,172)'], [0.35, 'rgb(106,137,247)'],
                [0.5, 'rgb(255,255,255)'], [0.6, 'rgb(232,150,124)'],
                [0.7, 'rgb(227,104,60)'], [1, 'rgb(236,8,32)']
            ],
            hoverongaps: false
        }
    ];

    const div = document.getElementById('poma_profile_example')
    Plotly.newPlot(div, data, layout);
}


//----------------------------------------------------------------------------------------------------------------------
// Summary Table Creating
//----------------------------------------------------------------------------------------------------------------------


const create_table = function (data) {
    const table = new Tabulator("#main-table", {
        data:data, //assign data to table
        //autoColumns:true, //create columns from data field names
        layout:"fitColumns",
        responsiveLayout:"hide",
        pagination:"local",
        paginationSize:15,
        rowClick:function(e, row){ //trigger an alert message when the row is clicked
            let div = document.getElementById(row.getData().id)
            let modalEl = document.getElementById("summaryTableModal")
            let modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
            zenscroll.to(div);
        },
        columns: [
            {title: "Name", field: "name", headerFilter: "input"},
            {title: "Sensor", field: "sensor", headerFilter: "select", headerFilterParams:{values:true}},
            {title: "Primary Category", field: "primaryCategory", headerFilter: "select", headerFilterParams:{values:true}},
            {title: "Secondary Category", field: "secondaryCategory", headerFilter: "select", headerFilterParams:{values:true}}
        ]
    });
}


//----------------------------------------------------------------------------------------------------------------------
// Init on data loading.
//----------------------------------------------------------------------------------------------------------------------


fetch('table_info.json')
    .then(response => response.json())
    .then(data => create_table(data))


fetch('mci_profile.json')
    .then(response => response.json())
    .then(data => draw_mci_heatmap(data));

fetch('poma_profile.json')
    .then(response => response.json())
    .then(data => draw_poma_heatmap(data));

fetch('Data_dict_Means_Corrs.json')
    .then(response => response.json())
    .then((data) => {
        connect_distribution_data_listeners(data);
        connect_correlations_data_listeners(data);
    });

