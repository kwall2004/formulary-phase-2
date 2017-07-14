/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.LevelIAssessment', {
  extend: 'Ext.panel.Panel',
  xtype: 'leveliassessment',
  title: 'Level I Assessment',

  items: [{
    xtype: 'container',
    layout: 'hbox',
    items: [
      {
        xtype: 'form',
        reference: 'leveliform',
        flex: 1,
        width: '100%',
        cls: 'card-panel',
        items: [
          {
            xtype: 'container',
            cls: 'fieldsetOverflow',
            scrollable: true,
            flex: 1,
            layout: {
              type: 'vbox'
            },
            defaults: {
              labelWidth: 720,
              fieldStyle: 'width:350px;'
            },
            items: [
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'littleInterest',
                reference: 'littleInterest',
                labelSeparator: ' ',
                fieldLabel: '1. Little interest/pleasure in doing things?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'feelingDown',
                reference: 'feelingDown',
                labelSeparator: ' ',
                fieldLabel: '2. Feeling down, depressed or hopeless?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'feelingIrritated',
                reference: 'feelingIrritated',
                labelSeparator: ' ',
                fieldLabel: '3. Feeling more irritated, grouchy or angry than usual?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'sleepingLessLotsOfEnergy',
                reference: 'sleepingLessLotsOfEnergy',
                labelSeparator: ' ',
                fieldLabel: '4. Sleeping less than usual but still have a lot of energy?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'feelingNervous',
                reference: 'feelingNervous',
                labelSeparator: ' ',
                fieldLabel: '5. Feeling nervous, anxious, frightened, worried or on edge?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'feelingPanic',
                reference: 'feelingPanic',
                labelSeparator: ' ',
                fieldLabel: '6. Feeling panic or being frightened?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'avoidingSituations',
                reference: 'avoidingSituations',
                labelSeparator: ' ',
                fieldLabel: '7. Avoiding situations that make you anxious?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'unexplainedAchesAndPains',
                reference: 'unexplainedAchesAndPains',
                labelSeparator: ' ',
                fieldLabel: '8. Unexplained aches and pains (e.g. head, back, joints, abdomen, legs)?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'illnessesNotTakenSerious',
                reference: 'illnessesNotTakenSerious',
                labelSeparator: ' ',
                fieldLabel: '9. Feeling that your illnesses are not being taken seriously enough?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'thoughtsHurtingSelf',
                reference: 'thoughtsHurtingSelf',
                labelSeparator: ' ',
                fieldLabel: '10. Thoughts of actually hurting yourself?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'hearingThings',
                reference: 'hearingThings',
                labelSeparator: ' ',
                fieldLabel: '11. Hearing things other people couldn\'t hear, such as voices even when no one was ' +
                'around?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'feelingHearingThoughts',
                reference: 'feelingHearingThoughts',
                labelSeparator: ' ',
                fieldLabel: '12. Feeling that someone could hear your thoughts or that you could hear what another ' +
                '<br> person was thinking?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'problemsWithSleep',
                reference: 'problemsWithSleep',
                labelSeparator: ' ',
                fieldLabel: '13. Problems with sleep that affected your sleep quality over all?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'problemsWithMemory',
                reference: 'problemsWithMemory',
                labelSeparator: ' ',
                fieldLabel: '14. Problems with Memory (e.g. learning new information) or with location <br> (e.g., ' +
                'finding your way home)?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'drinksADay',
                reference: 'drinksADay',
                labelSeparator: ' ',
                fieldLabel: '15. Drinking at least 4 drinks of any kind of alcohol in a single day?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'smoking',
                reference: 'smoking',
                labelSeparator: ' ',
                fieldLabel: '16. Smoking any cigarettes, a cigar, pipe, using snuff or chewing tobacco?',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'usingMedsOnYourOwn',
                reference: 'usingMedsOnYourOwn',
                labelSeparator: ' ',
                fieldLabel: '17. Using any of the following medications on your own, that is, without <br> ' +
                                'a doctor\'s prescription, in greater amounts or longer than prescribed <br> ' +
                                '[e.g., painkillers (like Vicodin), stimulants (like Ritalin or Adderall), <br> ' +
                                'sedatives or tranquilizers (like sleeping pills or Valium), <br> ' +
                                'or drugs like marijuana, cocaine or crack, club drugs (like ecstasy), <br>' +
                                'hallucinogens (like LSD), heroin,inhalants or solvents (like glue),<br>' +
                                'or methamphetamine (like speed)]',
                readOnly: true
              },
              {
                xtype: 'textfield',
                margin: '20px 0 10px 0',
                name: 'dateTimeStamp',
                reference: 'dateTimeStamp',
                labelSeparator: ' ',
                fieldLabel: 'Date/Time Stamp',
                readOnly: true
              }
            ]
          }
        ]
      }
    ]
  }]
});